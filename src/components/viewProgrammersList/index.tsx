import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Button } from 'reactstrap';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import programmersAction from '../../state/programmer/actions';
import CircularProgress from '@material-ui/core/CircularProgress';
import Slider from '@material-ui/lab/Slider';
const { GetProgrammers, AddProgrammer, RemoveProgrammer, ChangeLevelValue } = programmersAction;
import { bindActionCreators, Dispatch } from 'redux';
import { AppState } from '../../state';
import { connect } from 'react-redux';
import { Programmer } from '../../state/programmer/types';
import { red } from '@material-ui/core/colors';
import { Grid } from '@material-ui/core';

const styles = (theme: any) => ({
  card: {
    maxWidth: 400,
  },
  actions: {
    display: 'flex',
  },
  subheader: {
    fontSize: 18
  },
  avatar: {
    backgroundColor: red[500],
  },
  slider: {
    width: '50%',
    padding: '10px 0px',
  },
});
class ViewProgrammers extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      loader: this.props.programmer.loader,
      programmersArray: this.props.programmer.programmersArray,
      selectedProgrammersArray: this.props.programmer.selectedProgrammersArray,
      isSecondTabOpen: this.props.programmer.isSecondTabOpen,
    };
  }
  componentDidMount() {
    this.props.getProgrammers();
  }
  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    return {
      loader: nextProps.programmer.loader,
      programmersArray: nextProps.programmer.programmersArray,
      selectedProgrammersArray: nextProps.programmer.selectedProgrammersArray,
      isSecondTabOpen: nextProps.programmer.isSecondTabOpen,
    };
  }
  handleChangeLevel = (event: any, value: number, name: string) => {
    const payload = {
      name,
      value,
    };
    this.props.changeLevelValue(payload);
  };
  render() {
    const { classes } = this.props;
    const {
      auth,
      loader,
      programmersArray,
      isSecondTabOpen,
      selectedProgrammersArray,
    } = this.state;
    return (
      <div style={{ padding: '2%' }}>
        {loader && <CircularProgress />}
        {programmersArray.length > 0 && (
          <Grid container spacing={24}>
            {programmersArray.map((element: Programmer) => (
              <Grid item xs={12} sm={4}>
                <Card className={classes.card}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="Recipe" className={classes.avatar}>
                        P
                      </Avatar>
                    }
                    classes={{
                      subheader: classes.subheader,
                    }}
                    title={element.name}
                    subheader={`Skill level ${element.level}`}
                    action={
                      <Button
                        color="primary"
                        onClick={() => this.props.addProgrammer(element.name)}
                      >
                        Add
                      </Button>
                    }
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
        {isSecondTabOpen && (
          <div>
            <h2 style={{ textAlign: 'center' }}>Selected Programmers</h2>
            {selectedProgrammersArray.length > 0 && (
              <Grid container spacing={24}>
                {selectedProgrammersArray.map((element: Programmer) => (
                  <Grid item xs={12} sm={4}>
                    <Card className={classes.card}>
                      <CardHeader
                        avatar={
                          <Avatar aria-label="Recipe" className={classes.avatar}>
                            P
                          </Avatar>
                        }
                        title={element.name}
                        subheader={`Skill level ${element.level}`}
                        action={
                          <Button
                            color="danger"
                            onClick={() => this.props.removeProgrammer(element.name)}
                          >
                            Remove
                          </Button>
                        }
                      />
                      <CardActionArea>
                        <Slider
                          classes={{ container: classes.slider }}
                          value={element.level}
                          aria-labelledby="label"
                          max={10}
                          step={1}
                          onChange={(event: any, value: number) =>
                            this.handleChangeLevel(event, value, element.name)
                          }
                        />
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </div>
        )}
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch: Dispatch): any => {
  return {
    getProgrammers: bindActionCreators(GetProgrammers, dispatch),
    addProgrammer: bindActionCreators(AddProgrammer, dispatch),
    removeProgrammer: bindActionCreators(RemoveProgrammer, dispatch),
    changeLevelValue: bindActionCreators(ChangeLevelValue, dispatch),
  };
};
const mapStateToProps = (state: AppState): any => {
  return {
    programmer: state.programmer,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ViewProgrammers));
