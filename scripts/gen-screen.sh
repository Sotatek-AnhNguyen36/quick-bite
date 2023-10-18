#!/bin/bash

# Start scripte
NOW=$(date +"%m-%d-%Y %H:%M:%S")
echo 'Start Screen'
echo -e "Please enter your screen: (VD: Home => home || ProfileSetting => profile-setting)"
read name
# echo -e "Please enter description your screen: "
# read description
# echo -e "Please enter your author name: "
# read AUTHOR
# COPPYRIGHT="/* 
#   Created by ${AUTHOR} at ${NOW}
#   Screen ${description}
# */"
echo 'Create screen'

SOURCEDIR="src/screens/$name" #
echo $SOURCEDIR
mkdir "$SOURCEDIR"
chmod -R 777 "$SOURCEDIR"

upper_name=""
upper_all_name=""
if [[ $name == *"-"* ]]; then
  IFS='-' # hyphen (-) is set as delimiter
  read -ra ADDR <<< "$name" # str is read into an array as tokens separated by IFS
  for i in "${ADDR[@]}"; do # access each element of array
    echo ${i}
    upper_tmp="$(tr '[:lower:]' '[:upper:]' <<< ${i:0:1})${i:1}"
    upper_all_tmp="$(tr '[:lower:]' '[:upper:]' <<< "$i")"
    upper_name=${upper_name}${upper_tmp}
    if [ "$upper_all_name" == "" ]; then
      upper_all_name="${upper_all_name}${upper_all_tmp}"
    else
      upper_all_name="${upper_all_name}_${upper_all_tmp}"
    fi
    
  done
  IFS=' ' #
else
  upper_name="$(tr '[:lower:]' '[:upper:]' <<< ${name:0:1})${name:1}"
  upper_all_name="$(tr '[:lower:]' '[:upper:]' <<< "$name")"
fi

upper_name_screen="${upper_name}"Screen

# Generate folder View
echo 'Start folder View'
mkdir "$SOURCEDIR/components"
touch "$SOURCEDIR/$name.screen.tsx"

echo "import { MyContainer } from 'components/base/my-container';
import { useMyTheme } from 'hooks/useMyTheme';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text } from 'react-native';
import { ${upper_all_name}_SCREEN } from 'routing/screen-name';
import { navigate } from 'routing/service-navigation';
import { EThemeColor, getThemeColor } from 'themes/color';
import { RouterType } from 'types/route';

interface IParamsRoute {}

interface Props {
  route?: RouterType<IParamsRoute>;
}

const $upper_name_screen = (props: Props) => {
  const { colorCurrent, themeCurrent } = useMyTheme();
  const styles = React.useMemo(() => myStyles(themeCurrent), [themeCurrent]);
  const { t } = useTranslation();

  return (
    <MyContainer>
      <Text>$upper_name_screen</Text>
    </MyContainer>
  );
};

const myStyles = (themeCurrent: EThemeColor) => {
  const color = getThemeColor(themeCurrent);
  return StyleSheet.create({});
};

$upper_name_screen.start = (params?: IParamsRoute) => {
  navigate(${upper_all_name}_SCREEN, params);
};

export default $upper_name_screen;

" >> "$SOURCEDIR/$name.screen.tsx"

# Service
touch "$SOURCEDIR/$name.service.ts"
echo "const apiName = {};
" >> "$SOURCEDIR/$name.service.ts"

# import Screen name
SCREEN_NAME_PATH="src/routing/screen-name.ts"
echo "export const ${upper_all_name}_SCREEN = '${upper_all_name}_SCREEN';" >> ${SCREEN_NAME_PATH}

echo "End Scripts"