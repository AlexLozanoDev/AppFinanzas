import React from 'react';
import { Icon } from '@ui-kitten/components';

const getIcon = (props, nombre) => (
  <Icon
    {...props}
    name= {nombre}
  />
);

export default getIcon;
