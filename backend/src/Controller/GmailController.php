<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class GmailController extends AbstractController
{
    #[Route('/gmail', name: 'app_gmail')]
    public function index(): Response
    {
        return $this->render('gmail/index.html.twig', [
            'controller_name' => 'GmailController',
        ]);
    }
}
