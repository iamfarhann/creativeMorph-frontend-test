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
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import tindersAction from '../../state/tinder/actions';
const { GetPhotos, AddPhoto } = tindersAction;
import { bindActionCreators, Dispatch } from 'redux';
import { AppState } from '../../state';
import { connect } from 'react-redux';
import { DogPhoto } from '../../state/tinder/types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';


const styles = (theme: any) => ({
    root: {
        background: "linear-gradient(#e66465, #9198e5)",
        height: "100vh"
    },
    table: {
        width: "100%"
    },
    container: {
        maxHeight: "400px"
    }
});

class TinderHistory extends React.PureComponent<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            loader: this.props.tinder.loader,
            seenPhotosArray: this.props.tinder.seenPhotosArray,
            page: 0,
            rowsPerPage: 10
        };

    }

    // componentDidMount() {
    //     this.props.getPhotos();
    // }

    // static getDerivedStateFromProps(nextProps: any, prevState: any) {
    //     return {
    //         loader: nextProps.tinder.loader,
    //         seenPhotosArray: nextProps.tinder.seenPhotosArray
    //     };
    // }

    handleChangePage = (event: any, newPage: any) => {
        this.setState({ page: newPage });
    };

    handleChangeRowsPerPage = (event: any) => {
        this.setState({ rowsPerPage: +event.target.value, page: 0 })
    };


    render() {
        const { classes } = this.props;
        const {
            loader,
            seenPhotosArray,
            page,
            rowsPerPage
        } = this.state;
        return (
            <Grid container className={classes.root} justify="center" alignItems="center">
                <Grid container item md={6} xs={12} justify="center" alignItems="center" spacing={2} >
                    {loader && <CircularProgress />}
                    {!loader && !seenPhotosArray.length ? <Grid item md={12} xs={12}>
                        <Typography variant="h6" gutterBottom style={{ color: "white" }} display="block">
                            You have not liked or disliked any photos yet.
                        </Typography>
                        <Link to="/dog-tinder" style={{ textDecoration: 'none' }}>
                            <Button variant="contained" color="secondary">
                                See Photos
                                    </Button>
                        </Link>
                    </Grid> :
                        <>
                            <Grid item md={12} xs={12}>
                                <Typography variant="h3" component="h1" gutterBottom style={{ color: "white" }}>
                                    Dog Tinder History
                                    </Typography>
                            </Grid>
                            <Grid item md={12} xs={12}>
                                <Paper style={{ width: "100%" }}>
                                    <TableContainer className={classes.container}>
                                        <Table className={classes.table} stickyHeader aria-label="simple table">
                                            <TableHead >
                                                <TableRow>
                                                    <TableCell style={{ fontWeight: "bold" }}>Photo Link</TableCell>
                                                    <TableCell align="center" style={{ fontWeight: "bold" }}>Liked/Disliked</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {seenPhotosArray.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((element: DogPhoto) => (
                                                    <TableRow key={element.photoLink}>
                                                        <TableCell component="th" scope="row">
                                                            <a href={element.photoLink} style={{ textDecoration: "none" }} target="_blank">
                                                                {element.photoLink}
                                                            </a>
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            {element.LikedOrDisliked ?
                                                                <FavoriteIcon style={{ color: "red" }} /> : <ThumbDownIcon style={{ color: "black" }} />
                                                            }
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[10, 25, 50, 100]}
                                        component="div"
                                        count={seenPhotosArray.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    />
                                </Paper>
                                <Box m={2}>
                                    <Link to="/dog-tinder" style={{ textDecoration: 'none' }}>
                                        <Button variant="contained" color="secondary">
                                            See More Photos
                                    </Button>
                                    </Link>
                                </Box>
                            </Grid>
                        </>
                    }


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
)(withStyles(styles)(TinderHistory));
