import Grid from 'react-uikit-grid';
import Panel from 'react-uikit-panel';

// import uikit from '../../../node_modules/uikit/dist/css/uikit.css';

export default (props) => (
  <Grid gutter="collapse">
    <Panel col="1-3" />

    <Panel col='1-3' margin='bottom' box title='Block panel' type='block'>
      {props.children}
    </Panel>

    <Panel col="1-3" />
  </Grid>
);
