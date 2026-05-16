<?php

namespace App\Command;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:create-user',
    description: 'Crée un nouvel utilisateur en base de données',
)]
class CreateUserCommand extends Command
{
    public function __construct(
        private readonly EntityManagerInterface $em,
        private readonly UserRepository $userRepository,
    ) {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->addArgument('email', InputArgument::REQUIRED, 'Adresse email de l\'utilisateur')
            ->addArgument('name', InputArgument::REQUIRED, 'Nom de l\'utilisateur')
            ->addArgument('google-id', InputArgument::OPTIONAL, 'Google ID (généré aléatoirement si absent)');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $email = $input->getArgument('email');
        $name = $input->getArgument('name');
        $googleId = $input->getArgument('google-id') ?? 'manual_' . bin2hex(random_bytes(8));

        if ($this->userRepository->findOneBy(['email' => $email])) {
            $io->error(sprintf('Un utilisateur avec l\'email "%s" existe déjà.', $email));
            return Command::FAILURE;
        }

        if ($this->userRepository->findOneBy(['googleId' => $googleId])) {
            $io->error(sprintf('Un utilisateur avec le Google ID "%s" existe déjà.', $googleId));
            return Command::FAILURE;
        }

        $user = new User();
        $user->setEmail($email);
        $user->setName($name);
        $user->setGoogleId($googleId);
        $user->setAccessToken('');
        $user->setApiToken(bin2hex(random_bytes(32)));
        $user->setCreatedAt(new \DateTimeImmutable());

        $this->em->persist($user);
        $this->em->flush();

        $io->success(sprintf('Utilisateur "%s" créé avec succès.', $email));
        $io->table(
            ['Champ', 'Valeur'],
            [
                ['ID', $user->getId()],
                ['Email', $user->getEmail()],
                ['Nom', $user->getName()],
                ['Google ID', $user->getGoogleId()],
                ['API Token', $user->getApiToken()],
                ['Créé le', $user->getCreatedAt()->format('Y-m-d H:i:s')],
            ]
        );

        return Command::SUCCESS;
    }
}
