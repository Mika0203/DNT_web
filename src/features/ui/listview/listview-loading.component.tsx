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

  useEffect(() => {
    if (loader.current === null) return;
    const obs = new IntersectionObserver((c, b) => {
      if (c[0].isIntersecting) {
        onIntersect();
      }
    });

    obs.observe(loader.current);
  }, [loader]);

  return (
    <StyledLoadingItem ref={loader}>
      <CircularProgress />
    </StyledLoadingItem>
  );
}
