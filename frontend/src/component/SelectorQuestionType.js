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

export default function TypeSelect(props) {
    const classes = useStyles();

    const handleChange = (event) => {
        props.onQuestionTypeChange(event.target.value);
    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Select Type:</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={props.questionType}
                    onChange={handleChange}
                >
                    <MenuItem value={"multiple"}>Multiple</MenuItem>
                    <MenuItem value={"boolean"}>True / False</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}
