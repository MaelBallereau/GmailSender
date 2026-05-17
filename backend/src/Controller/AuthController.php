<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use League\OAuth2\Client\Provider\Google;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
#[Route('/api')]
final class AuthController extends AbstractController
{
    #[Route('/auth/login', name: 'auth_login', methods: ['GET'])]
    public function login(Request $request): RedirectResponse
    {
        $provider = $this->createProvider();

        $authUrl = $provider->getAuthorizationUrl([
            'scope' => [
                'openid',
                'email',
                'profile',
                'https://www.googleapis.com/auth/gmail.send',
                'https://www.googleapis.com/auth/gmail.readonly',
            ],
            'access_type' => 'offline',
            'prompt' => 'consent',
        ]);

        $request->getSession()->set('oauth2state', $provider->getState());

        return $this->redirect($authUrl);
    }

    #[Route('/auth/callback', name: 'auth_callback', methods: ['GET'])]
    public function callback(
        Request $request,
        EntityManagerInterface $em,
        UserRepository $userRepository,
    ): RedirectResponse {
        $state = $request->query->get('state');
        $code = $request->query->get('code');
        $error = $request->query->get('error');

        if ($error) {
            return $this->redirect($this->getParameter('app.frontend_url') . '/login?error=' . urlencode($error));
        }

        if (!$state || $state !== $request->getSession()->get('oauth2state')) {
            return $this->redirect($this->getParameter('app.frontend_url') . '/login?error=invalid_state');
        }

        $provider = $this->createProvider();
        $token = $provider->getAccessToken('authorization_code', ['code' => $code]);
        /** @var \League\OAuth2\Client\Provider\GoogleUser $ownerDetails */
        $ownerDetails = $provider->getResourceOwner($token);

        $user = $userRepository->findOneBy(['googleId' => $ownerDetails->getId()]);
        if (!$user) {
            $user = new User();
            $user->setGoogleId((string) $ownerDetails->getId());
            $user->setCreatedAt(new \DateTimeImmutable());
            $user->setApiToken(bin2hex(random_bytes(32)));
        }

        $user->setEmail((string) $ownerDetails->getEmail());
        $user->setName((string) $ownerDetails->getName());
        $user->setAccessToken($token->getToken());
        $user->setRefreshToken($token->getRefreshToken());

        if ($token->getExpires()) {
            $user->setTokenExpiresAt(new \DateTimeImmutable('@' . $token->getExpires()));
        }

        $em->persist($user);
        $em->flush();

        $cookie = Cookie::create('api_token')
            ->withValue($user->getApiToken())
            ->withHttpOnly(true)
            ->withSameSite(Cookie::SAMESITE_LAX)
            ->withSecure(false)
            ->withPath('/');

        $response = new RedirectResponse($this->getParameter('app.frontend_url') . '/dashboard');
        $response->headers->setCookie($cookie);

        return $response;
    }

    #[Route('/auth/logout', name: 'auth_logout', methods: ['GET'])]
    public function logout(Request $request): RedirectResponse
    {
        $request->getSession()->clear();

        $response = new RedirectResponse($this->getParameter('app.frontend_url') . '/login');
        $response->headers->clearCookie('api_token', '/');

        return $response;
    }

    #[Route('/auth/me', name: 'auth_me', methods: ['GET'])]
    public function me(Request $request, UserRepository $userRepository): Response
    {
        $apiToken = $request->cookies->get('api_token');
        $user = $apiToken ? $userRepository->findByApiToken($apiToken) : null;

        if (!$user) {
            return $this->json(['error' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
        }

        return $this->json([
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'name' => $user->getName(),
        ]);
    }

    private function createProvider(): Google
    {
        return new Google([
            'clientId' => $this->getParameter('gmail.client_id'),
            'clientSecret' => $this->getParameter('gmail.client_secret'),
            'redirectUri' => $this->getParameter('app.frontend_url') . '/api/auth/callback',
        ]);
    }
}
