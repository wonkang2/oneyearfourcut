import React from 'react';
import * as S from './style';

import Camera from 'assets/Icon/camera';
import { Btn, IconBtn } from 'shared/components/Buttons';

const index = () => {
  // api에서 title, content 받아오기
  return (
    <div>
      <S.BtnContainer>
        <Btn className='mr'>3D 전시관 보러가기</Btn>
        <IconBtn className='white' icon={<Camera />}>
          <p>사진 올려주기</p>
        </IconBtn>
      </S.BtnContainer>

      <S.Time>전시기간은 11월 17일까지입니다</S.Time>
    </div>
  );
};

export default index;