import React, { Children, cloneElement } from 'react';
import { withRouter } from 'next/router';
import NextLink from 'next/link';

const NavLink = withRouter(({ activeClassName, children, router, ...props }) => {
  const child = Children.only(children);

  let className = child.props.className || '';
  const linkPathname = typeof props.href === 'string' ? props.href : props.href.pathname || null;

  if (router.pathname === linkPathname && activeClassName) {
    className += ` ${activeClassName}`;
  }

  return <NextLink {...props}>{cloneElement(child, { className })}</NextLink>;
});

export default NavLink;
