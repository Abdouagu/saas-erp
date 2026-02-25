import React from 'react';
import styled from 'styled-components';

const VARIANTS = {
  success: {
    background: '#ECFDF5',
    color: '#065F46',
    dot: '#10B981',
  },
  warning: {
    background: '#FFFBEB',
    color: '#92400E',
    dot: '#F59E0B',
  },
  danger: {
    background: '#FEF2F2',
    color: '#991B1B',
    dot: '#EF4444',
  },
  info: {
    background: '#EFF6FF',
    color: '#1E40AF',
    dot: '#3B82F6',
  },
  default: {
    background: '#F9FAFB',
    color: '#374151',
    dot: '#6B7280',
  },
};

const Pill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 600;
  line-height: 1.6;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
`;

const Dot = styled.span`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  flex-shrink: 0;
  background: ${({ $dotColor }) => $dotColor};
`;

export default function Badge({ variant = 'default', children }) {
  const v = VARIANTS[variant] ?? VARIANTS.default;

  return (
    <Pill $bg={v.background} $color={v.color}>
      <Dot $dotColor={v.dot} />
      {children}
    </Pill>
  );
}
