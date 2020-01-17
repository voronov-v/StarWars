import React, { FC, ReactElement } from 'react';
import { View } from 'react-native';
import { CurrencyRatesTableProps } from './types';
import { styles } from './styles';
//@ts-ignore
import { Row, Rows, Table, TableWrapper } from 'react-native-table-component';

export const CurrencyRatesTable: FC<CurrencyRatesTableProps> = (props): ReactElement<CurrencyRatesTableProps> => {
  const { ratesToRender, textColor } = props;
  const rowsData = ratesToRender.map((e) => [e.Cur_Name, e.Cur_OfficialRate, e.Cur_Abbreviation, e.Cur_Scale]);

  return (
    <View style={styles.tableWrapper}>
      <Table borderStyle={{}}>
        <Row
          data={['Currency', 'Rate', 'Code', 'Count']}
          style={{ ...styles.tableHead, borderColor: textColor }}
          flexArr={[2, 1, 1, 1]}
          textStyle={{ ...styles.tableHeadRow, color: textColor }}
        />
        <TableWrapper style={{ flexDirection: 'row' }}>
          <Rows
            data={rowsData}
            flexArr={[2, 1, 1, 1]}
            style={{ height: 30 }}
            textStyle={{ ...styles.tableRow, color: textColor }}
          />
        </TableWrapper>
      </Table>
    </View>
  );
};
