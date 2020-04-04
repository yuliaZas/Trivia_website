import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 150,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function CategorySelect() {
    const classes = useStyles();
    const [category, setCategory] = React.useState('');

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Select Category:</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    onChange={handleChange}
                >
                    <MenuItem value={9}>General Knowledge</MenuItem>
                    <MenuItem value={10}>Entertainment: Books</MenuItem>
                    <MenuItem value={11}>Entertainment: Film</MenuItem>
                    <MenuItem value={12}>Entertainment: Music</MenuItem>
                    <MenuItem value={13}>Entertainment: Musicals & Theatres</MenuItem>
                    <MenuItem value={14}>Entertainment: Television</MenuItem>
                    <MenuItem value={15}>Entertainment: Video Games</MenuItem>
                    <MenuItem value={16}>Entertainment: Board Games</MenuItem>
                    <MenuItem value={17}>Science & Nature</MenuItem>
                    <MenuItem value={18}>Science: Computers</MenuItem>
                    <MenuItem value={19}>Science: Mathematics</MenuItem>
                    <MenuItem value={20}>Mythology</MenuItem>
                    <MenuItem value={21}>"Sports</MenuItem>
                    <MenuItem value={22}>Geography</MenuItem>
                    <MenuItem value={23}>History</MenuItem>
                    <MenuItem value={24}>Politics</MenuItem>
                    <MenuItem value={25}>Art</MenuItem>
                    <MenuItem value={26}>Celebrities</MenuItem>
                    <MenuItem value={27}>Animals</MenuItem>
                    <MenuItem value={28}>Vehicles</MenuItem>
                    <MenuItem value={29}>Entertainment: Comics</MenuItem>
                    <MenuItem value={30}>Science: Gadgets</MenuItem>
                    <MenuItem value={31}>Entertainment: Japanese Anime & Manga</MenuItem>
                    <MenuItem value={32}>Entertainment: Cartoon & Animations</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}
