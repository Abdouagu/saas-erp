import React from 'react';
import styled, { css } from 'styled-components';

const variantStyles = {
  primary: css`
    background: #6366F1;
    color: #ffffff;
    border: 1px solid transparent;
    box-shadow: 0 1px 4px rgba(99, 102, 241, 0.3);

    &:hover:not(:disabled) {
      background: #4F46E5;
      box-shadow: 0 2px 8px rgba(99, 102, 241, 0.4);
    }
  `,
  secondary: css`
    background: #ffffff;
    color: #374151;
    border: 1px solid #E5E7EB;

    &:hover:not(:disabled) {
      background: #F9FAFB;
      border-color: #D1D5DB;
    }
  `,
  danger: css`
    background: #EF4444;
    color: #ffffff;
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      background: #DC2626;
    }
  `,
  ghost: css`
    background: transparent;
    color: #6B7280;
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      background: #F9FAFB;
      color: #374151;
    }
  `,
};

const sizeStyles = {
  sm: css`
    padding: 8px 14px;
    font-size: 12px;
  `,
  md: css`
    padding: 10px 18px;
    font-size: 14px;
  `,
  lg: css`
    padding: 12px 22px;
    font-size: 15px;
  `,
};

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  text-decoration: none;
  line-height: 1.4;
  white-space: nowrap;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${({ $variant }) => variantStyles[$variant] ?? variantStyles.secondary}
  ${({ $size }) => sizeStyles[$size] ?? sizeStyles.md}
`;

export default function Button({
  variant = 'secondary',
  size = 'md',
  children,
  as: Tag = 'button',
  ...props
}) {
  return (
    <StyledButton as={Tag} $variant={variant} $size={size} {...props}>
      {children}
    </StyledButton>
  );
}
