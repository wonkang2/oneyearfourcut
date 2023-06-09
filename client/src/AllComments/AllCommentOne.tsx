import * as S from 'SingleComments/SingleComment/SingleComment.style';
import useDeleteComment from 'SingleComments/hooks/useDeleteComment';
import 'moment/locale/ko';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';
import { loginStore, ModalStore, UploadStore } from 'store/store';
import { Alert } from 'shared/components/Modal/Alert';
import { DeleteComment } from 'shared/components/Modal/AlertData';
import ModalBackdrop from 'shared/components/Modal/components/ModalBackdrop';
import styled from 'styled-components';

const Back = styled.div`
  position: absolute;
  left: 0;
`;
const CommentZone = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Zone = styled.div`
  width: calc(100% - 5rem);
`;

const Pic = styled.div`
  width: 4rem;
  height: 4rem;
  margin-top: 1rem;
`;

const AllSingleComment = ({
  commentId,
  nickname,
  time,
  comment,
  picPath,
  artworkId,
}: {
  commentId: number;
  nickname: string;
  time: number;
  comment: string;
  artworkId?: number;
  picPath?: any;
}) => {
  const params = useParams();
  const galleryId = parseInt(params.galleryId!);
  const { mutate } = useDeleteComment(galleryId);

  const { target, openModal, closeModal } = ModalStore();
  const { resetData } = UploadStore();
  const { user } = loginStore();
  const navigate = useNavigate();

  let nowTime = moment(time).format('YYMMDD HH:mm');
  const OpenModal = () => {
    openModal('AlertModal');
  };
  const handleProgressBtn = (el: any) => {
    console.log(el);
    mutate(el);
    resetData();
    closeModal('AlertModal');
  };
  return (
    <S.Body>
      <CommentZone>
        <Zone>
          <S.Info>
            <S.NickName>{nickname}</S.NickName>
            <S.Time>{nowTime}</S.Time>
          </S.Info>
          <S.Comment>
            {comment}
            {galleryId === user?.galleryId ? (
              <S.Delete onClick={OpenModal}>삭제</S.Delete>
            ) : nickname === user?.nickname ? (
              <S.Delete onClick={OpenModal}>삭제</S.Delete>
            ) : null}
          </S.Comment>
        </Zone>
        {picPath !== null ? (
          <Pic
            style={{
              backgroundImage: `url(${picPath})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
            onClick={() => navigate(`/allPic/${galleryId}/${artworkId}`)}
          ></Pic>
        ) : (
          <Pic
            style={{
              backgroundImage: `url('https://cdn.discordapp.com/attachments/1039400312710115408/1049733372114649129/8a4b8881269d0ccc.png')`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          ></Pic>
        )}
      </CommentZone>
      <S.ButtonZone>
        <S.Button type='button'>답글</S.Button>
      </S.ButtonZone>
      {target.AlertModal ? (
        <Back>
          <ModalBackdrop>
            <Alert data={DeleteComment(() => handleProgressBtn(commentId))} />
          </ModalBackdrop>
        </Back>
      ) : null}
    </S.Body>
  );
};

export default AllSingleComment;
