import React from 'react';

export default (props) => (
  <Grid gutter="collapse">
    <Panel col="1-3" />

    <Panel col='1-3' margin='bottom' box title='Block panel' type='block'>
      {props.children}
    </Panel>

    <Panel col="1-3" />
  </Grid>
);
