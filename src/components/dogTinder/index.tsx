import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {
    Grid,
    Box,
    Typography,
    Card,
    CardMedia,
    CardActions,
    Button,
    Fab,
    CircularProgress
} from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import CloseIcon from '@material-ui/icons/Close';
import tindersAction from '../../state/tinder/actions';
const { GetPhotos, AddPhoto } = tindersAction;
import { bindActionCreators, Dispatch } from 'redux';
import { AppState } from '../../state';
import { connect } from 'react-redux';



const styles = (theme: any) => ({
    root: {
        background: "linear-gradient(#e66465, #9198e5)",
        height: "100vh"
    },
    media: {
        height: "400px",
        paddingTop: '56.25%', // 16:9
        loading: "lazy"
    },
    card: {
        width: "100%"
    },
});

class DogTinder extends React.PureComponent<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            loader: this.props.tinder.loader,
            photosArray: this.props.tinder.photosArray,
            seenPhotosArray: this.props.tinder.seenPhotosArray,
            current: this.props.tinder.current
        };

    }

    componentDidMount() {
        if(!this.props.tinder.photosArray.length){
            this.props.getPhotos();
        }
    }

    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        return {
            loader: nextProps.tinder.loader,
            photosArray: nextProps.tinder.photosArray,
            seenPhotosArray: nextProps.tinder.seenPhotosArray,
            current: nextProps.tinder.current
        };
    }

    handlePhoto = (url: string, status: boolean) => {
        this.props.addPhoto(url, status);
    }

    render() {
        const { classes } = this.props;
        const {
            current,
            loader,
            photosArray,
            seenPhotosArray
        } = this.state;
        console.log(this.state);
        return (
            <Grid container className={classes.root} justify="center" alignItems="center">
                <Grid container item md={6} xs={12} justify="center" alignItems="center" spacing={2} >
                    {loader && <CircularProgress />}
                    {!loader && current >= photosArray.length ? <Grid item md={12} xs={12}>
                        <Typography variant="h6" gutterBottom style={{ color: "white" }}>
                            You have watched all photos, try later
                        </Typography>
                    </Grid> :
                        photosArray.length > 0 && (
                            <>
                                <Grid item md={12} xs={12}>
                                    <Typography variant="h3" component="h1" gutterBottom style={{ color: "white" }}>
                                        Dog Tinder
                                    </Typography>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <Card className={classes.card} raised>
                                        <CardMedia
                                            className={classes.media}
                                            image={photosArray[current]}
                                            title={`photo-${current}`}
                                        />
                                        <CardActions style={{ background: "#80808047" }}>
                                            <Box width={1} display="flex" alignItems="center">
                                                <Box width={1 / 2} display="flex" justifyContent="flex-start">
                                                    <Fab aria-label="dislike" style={{ background: "white" }} size="small" onClick={() => this.handlePhoto(photosArray[current], false)}>
                                                        <CloseIcon style={{ color: "black" }} />
                                                    </Fab>
                                                </Box>
                                                <Box width={1 / 2} display="flex" justifyContent="flex-end">
                                                    <Fab aria-label="like" style={{ background: "white" }} size="small" onClick={() => this.handlePhoto(photosArray[current], true)}>
                                                        <FavoriteIcon style={{ color: "red" }} />
                                                    </Fab>
                                                </Box>
                                            </Box>
                                        </CardActions>
                                    </Card>
                                </Grid>
                                <Grid item md={12} xs={12}>
                                    <Link to="/tinder-history" style={{ textDecoration: 'none' }}>
                                        <Button variant="contained" color="secondary">
                                            See History
                                    </Button>
                                    </Link>
                                </Grid>
                            </>
                        )}


                </Grid>
            </Grid>
        );
    }
}
const mapDispatchToProps = (dispatch: Dispatch): any => {
    return {
        getPhotos: bindActionCreators(GetPhotos, dispatch),
        addPhoto: bindActionCreators(AddPhoto, dispatch),
    };
};
const mapStateToProps = (state: AppState): any => {
    return {
        tinder: state.tinder,
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(DogTinder));
