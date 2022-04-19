import { ReactChild } from 'react';

type ComponentAsProp = ReactChild | null;

export type ComponentsAsProp = ComponentAsProp | ComponentAsProp[];
