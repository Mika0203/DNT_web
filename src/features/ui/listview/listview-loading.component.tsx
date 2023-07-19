import {CircularProgress} from '@mui/material';
import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';

const StyledLoadingItem = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: auto;
  padding: 20px;
`;

export default function LoadingItem({onIntersect}: {onIntersect: () => void}) {
  const loader = useRef(null);
  const obs = useRef<IntersectionObserver>(null);

  useEffect(() => {
    if (loader.current === null) return;
    if (obs.current !== null) obs.current!.disconnect();

    obs.current = new IntersectionObserver((c, b) => {
      if (c[0].isIntersecting) {
        onIntersect();
        obs.current.disconnect();
      }
    });
    obs.current.observe(loader.current);
  }, [loader, onIntersect]);

  return (
    <StyledLoadingItem ref={loader}>
      <CircularProgress />
    </StyledLoadingItem>
  );
}
