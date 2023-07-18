import {Button, DialogTitle} from '@mui/material';
import {DomainAPI} from '@src/api';
import {ExcelUtils, excelDefaultHeader} from '@src/utils';
import {styled} from 'styled-components';

const StyledButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 32px;
`;

export default function ExcelImportModal() {
  const onClickDownload = ({
    fileName = '도메인 입력 템플릿',
    data = [],
  }: {
    fileName?: string;
    data?: Object[];
  } = {}) => {
    ExcelUtils.download(fileName, {
      headers: excelDefaultHeader,
      data: data,
    });
  };

  const onClickToUpload = () => {
    const reader = new FileReader();

    const input = document.createElement('input');
    input.onchange = () => {
      reader.readAsArrayBuffer(input.files[0]);
    };

    reader.onload = async (e) => {
      const data = await ExcelUtils.read(e.target.result as ArrayBuffer);

      const projectIndex = data[0].findIndex((e) => e === '프로젝트');
      const domainIndex = data[0].findIndex((e) => e === '도메인');
      const codeIndex = data[0].findIndex((e) => e === '코드');
      const langIndex = data[0].findIndex((e) => e === '언어');
      const dataTypeIndex = data[0].findIndex((e) => e === '데이터타입');
      const abbIndex = data[0].findIndex((e) => e === '약어');
      const desIndex = data[0].findIndex((e) => e === '설명');

      data.slice(1).forEach((d) => {
        DomainAPI.addDomain({
          project: d[projectIndex],
          abbreviation: d[abbIndex],
          code: d[codeIndex],
          dataType: d[dataTypeIndex],
          description: d[desIndex],
          domain: d[domainIndex],
          lang: d[langIndex],
        });
      });
    };

    input.type = 'file';
    input.accept = '.xlsx';
    input.click();
  };

  return (
    <>
      <DialogTitle id='alert-dialog-title'>{'xlsx 파일 추가'}</DialogTitle>
      <StyledButtons>
        <Button onClick={() => onClickDownload()} variant='contained'>
          템플릿 다운로드
        </Button>
        <Button onClick={onClickToUpload} variant='contained'>
          파일 추가
        </Button>
      </StyledButtons>
    </>
  );
}
