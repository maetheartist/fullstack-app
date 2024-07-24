"use client"
import  { ReactNode } from 'react';

type HeaderProps = {
  children: ReactNode;
};

export default function Header({ children }: HeaderProps) {
  return (
    <header>
      {children}
    </header>
  );
}
