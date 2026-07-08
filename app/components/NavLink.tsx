import Link, { LinkProps } from "next/link";

interface NavLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

const NavLink = ({ children, className, ...props }: NavLinkProps) => {
  return (
    <Link
      {...props}
      className={`hover:text-gray-300 ${className ?? ""}`}
    >
      {children}
    </Link>
  );
};

export default NavLink;