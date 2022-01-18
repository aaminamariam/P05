import React from 'react';
import { Avatar, Box, Card, CardContent, makeStyles, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    textBold: {
        fontWeight: 'bold'
    },
    justifyBetween: {
        justifyContent: 'space-between'
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));

const DashCard = (props: any) => {
    const { cardTitle, cardDescription, cardIcon, cardIconBG = 'transparent', cardIconColor = 'black' } = props;
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Box textAlign={'end'}>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        2022
                    </Typography>
                </Box>
                <Box>
                    <Avatar className={classes.large} style={{ backgroundColor: cardIconBG, color: cardIconColor, margin: '1rem 0' }}>
                        {cardIcon}
                    </Avatar>
                </Box>
                <Box display={'flex'} alignItems={'center'} className={classes.justifyBetween}>
                    <Typography className={classes.title} color="textPrimary" style={{fontWeight: '500'}}>
                        {cardTitle}
                    </Typography>
                    <Typography className={classes.textBold} variant='h6'>
                        {cardDescription}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default DashCard;