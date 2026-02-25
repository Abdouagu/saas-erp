import React from 'react';
import { Link } from '@inertiajs/react';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 16px;
`;

const activeStyles = css`
  background: #6366F1;
  color: #ffffff;
  border-color: #6366F1;
  font-weight: 600;
`;

const inactiveStyles = css`
  background: #ffffff;
  color: #4B5563;
  border-color: #E5E7EB;

  &:hover {
    background: #F3F4F6;
    color: #111827;
    border-color: #D1D5DB;
  }
`;

const disabledStyles = css`
  opacity: 0.4;
  pointer-events: none;
  cursor: default;
  background: #ffffff;
  color: #6B7280;
  border-color: #E5E7EB;
`;

const PageItem = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  border-radius: 6px;
  border: 1px solid transparent;
  font-size: 13px;
  text-decoration: none;
  transition: all 0.15s ease;

  ${({ $active }) => ($active ? activeStyles : inactiveStyles)}
`;

const DisabledItem = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  border-radius: 6px;
  border: 1px solid #E5E7EB;
  font-size: 13px;
  ${disabledStyles}
`;

const Ellipsis = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  padding: 0 4px;
  font-size: 13px;
  color: #9CA3AF;
  user-select: none;
`;

export default function Pagination({ links }) {
  if (!links || links.length <= 3) return null;

  return (
    <Wrapper>
      {links.map((link, i) => {
        if (!link.url) {
          // Ellipsis "..." separators or truly disabled prev/next
          const isDots = link.label === '...';
          if (isDots) {
            return <Ellipsis key={i}>…</Ellipsis>;
          }
          return (
            <DisabledItem
              key={i}
              dangerouslySetInnerHTML={{ __html: link.label }}
            />
          );
        }

        return (
          <PageItem
            key={i}
            href={link.url}
            $active={link.active}
            dangerouslySetInnerHTML={{ __html: link.label }}
          />
        );
      })}
    </Wrapper>
  );
}
