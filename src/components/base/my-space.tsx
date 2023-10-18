import React, { memo } from 'react';
import { View } from 'react-native';
import { scale } from 'utils/scale';

// Default width and height is 4 and 8,
export type Props = {
  width?: number;
  height?: number;
  flex?: number;
};

const MySpace: React.FC<Props> = props => {
  const { width = 4, height = 8, flex } = props;

  return <View style={{ flex, width: scale(width), height: scale(height) }} />;
};

export default memo(MySpace);
