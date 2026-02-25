import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: #ffffff;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s ease, border-color 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border-color: #D1D5DB;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
`;

const Body = styled.div`
  flex: 1;
  min-width: 0;
`;

const Title = styled.p`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #9CA3AF;
  margin: 0 0 6px 0;
`;

const Value = styled.p`
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 4px 0;
  font-variant-numeric: tabular-nums;
`;

const Subtitle = styled.p`
  font-size: 12px;
  color: #9CA3AF;
  margin: 0;
`;

const IconBox = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: #EEF2FF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 18px;
  color: #6366F1;
`;

export default function StatCard({ title, value, subtitle, icon }) {
  return (
    <Card>
      <Header>
        <Body>
          <Title>{title}</Title>
          <Value>{value}</Value>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
        </Body>
        {icon && <IconBox>{icon}</IconBox>}
      </Header>
    </Card>
  );
}
