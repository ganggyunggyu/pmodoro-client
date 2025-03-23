import Link from 'next/link';

const LinkButton = ({ children, route }) => {
  return <Link href={`/pages/${route}`}>{children}</Link>;
};

export default LinkButton;
