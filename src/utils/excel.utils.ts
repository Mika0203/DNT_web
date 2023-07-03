import exceljs from 'exceljs';

export type ExcelData = {
  header: string;
  data: string[] | number[];
};

const model: ExcelData[] = [
  {
    header: '회원번호',
    data: [],
  },
  {
    header: '이메일',
    data: [],
  },
  {
    header: '지급 수량',
    data: [],
  },
  {
    header: '코멘트(조회용)',
    data: [],
  },
];

type Props = {
  /*
    해당 배열의 순서로 엑셀에 그려집니다.
   */
  headers: {
    /*
    엑셀 상단에 표기될 한글이름 입니다.
   */
    label: string;

    /*
    api 요청으로 받은 json data의 key값입니다.
     */
    keyName: string;
  }[];

  /*
  Array 형태의 json 데이터를 넣어주세요
   */
  data: Array<Object>;
};

class ExcelUtils {
  static async download(fileName: string, {headers, data}: Props) {
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet();

    const excelData = this.dataConverter({headers, data});

    excelData.forEach((eData, index) => {
      worksheet.getColumn(index + 1).values = [eData.header, ...eData.data];
      worksheet.getColumn(index + 1).width = 20;
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${fileName}.xlsx`;
    anchor.click();
    window.URL.revokeObjectURL(url);
  }

  static dataConverter({headers, data}: Props): ExcelData[] {
    const obj: {
      [header: string]: {
        label: string;
        data: string[];
      };
    } = headers.reduce((p, c, index) => {
      return {
        ...p,
        [c.keyName]: {
          label: headers[index].label,
          data: [],
        },
      };
    }, {});

    data.forEach((e) => {
      headers.forEach((name) => {
        if (e.hasOwnProperty(name.keyName)) {
          const find = Object.entries(e).find((en) => en[0] === name.keyName)!;

          if (find[1] instanceof Date) {
            obj[name.keyName].data.push(find[1].toLocaleString());
          } else {
            obj[name.keyName].data.push(find[1]);
          }
        } else {
          obj[name.keyName].data.push('');
        }
      });
    });

    return headers.map(
      (header): ExcelData => ({
        header: obj[header.keyName].label,
        data: obj[header.keyName].data,
      })
    );
  }

  static async read(buffer: exceljs.Buffer) {
    const w = new exceljs.Workbook();
    const book = await w.xlsx.load(buffer);
    const arr = [];

    book.eachSheet((sheet) => {
      sheet.eachRow((row) => {
        arr.push(row.values);
      });
    });

    return arr;
  }
}

export default ExcelUtils;
export {model};
