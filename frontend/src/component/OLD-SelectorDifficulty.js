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

export default function DifficultySelect(props) {
    const classes = useStyles();
    const [difficulty, setDifficulty] = React.useState('');

    const handleChange = (event) => {
        props.onDifficultyChange(event.target.value);
    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Select Difficulty:</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={difficulty}
                    onChange={handleChange}
                >
                    <MenuItem value={"easy"}>Easy</MenuItem>
                    <MenuItem value={"medium"}>Medium</MenuItem>
                    <MenuItem value={"hard"}>Hard</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}
