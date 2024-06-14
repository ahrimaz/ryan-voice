import { Stack, HStack, Link, Text, Divider, Image, IconButton, LinkProps } from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const links = ['Demos', 'About', 'Contact Me', 'Hire Me'];
const accounts = [
  {
    url: 'https://github.com/ahrimaz',
    label: 'Github Account',
    type: 'gray',
    icon: <FaGithub />
  },
  {
    url: 'https://twitter.com/',
    label: 'Twitter Account',
    type: 'twitter',
    icon: <FaTwitter />
  },
  {
    url: 'https://linkedin.com/',
    label: 'LinkedIn Account',
    type: 'linkedin',
    icon: <FaLinkedin />
  }
];

const Footer = () => {
  return (
    <Stack
      maxW="5xl"
      marginInline="auto"
      p={8}
      spacing={{ base: 8, md: 0 }}
      justifyContent="center"
      alignItems="center"
      direction={{ base: 'column', md: 'row' }}
      height="100%"
    >
      <Text marginRight={8}>Logo</Text>

      {/* desktop */}
      <HStack spacing={8} alignItems="center" d={{ base: 'none', md: 'flex' }} marginRight={8}>
        {links.map((link, index) => (
          <CustomLink key={index}>{link}</CustomLink>
        ))}
      </HStack>

      <Stack direction="row" spacing={4} pt={{ base: 4, md: 0 }} alignItems="center" justifyContent="center">
        {accounts.map((sc, index) => (
          <IconButton
            key={index}
            as={Link}
            isExternal
            href={sc.url}
            aria-label={sc.label}
            colorScheme={sc.type}
            icon={sc.icon}
            rounded="md"
          />
        ))}
      </Stack>
    </Stack>
  );
};

const CustomLink = ({ children, ...props }: LinkProps) => {
  return (
    <Link href="#" fontSize="sm" _hover={{ textDecoration: 'underline' }} {...props}>
      {children}
    </Link>
  );
};

export default Footer;