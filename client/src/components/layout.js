import Grid from 'react-uikit-grid';
import Panel from 'react-uikit-panel';

import 'uikit/dist/css/uikit.min.css';

export default (props) => (
  <Grid gutter="collapse">
    <Panel col="1-3" />

    <Panel
      col="1-3"
      title={props.title}
      header
      space>
      {props.children}
    </Panel>

    <Panel col="1-3" />
  </Grid>
);
