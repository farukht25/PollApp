import React, { useState } from 'react'
import * as Yup from 'yup'
import { Formik, useFormik } from 'formik'
import axios from "axios";
import { FaRegCopy } from 'react-icons/fa';

export default function CreatePollForm() {
    const [pollId, setPollId] = useState("");
    const formik = useFormik(
        {
            initialValues: {
                formName: "",
                option1: "",
                option2: "",
                option3: "",
                option4: "",
            },
            validationSchema: Yup.object({
                formName: Yup.string().min(1, 'must be between 1 and 10 charecters long')
                    .max(20, 'must be between 1 and 20 charecters long')
                    .required('required'),
                option1: Yup.string().min(1, 'must be between 1 and 10 charecters long')
                    .max(20, 'must be between 1 and 20 charecters long')
                    .required('required'),
                option2: Yup.string().min(1, 'must be between 1 and 10 charecters long')
                    .max(20, 'must be between 1 and 20 charecters long')
                    .required('required'),
                option3: Yup.string().min(1, 'must be between 1 and 10 charecters long')
                    .max(20, 'must be between 1 and 20 charecters long'),
                option4: Yup.string().min(1, 'must be between 1 and 10 charecters long')
                    .max(20, 'must be between 1 and 20 charecters long')
            }),
            onSubmit: (values, { resetForm }) => {
                createPoll(values)
                resetForm();
            }
        }


    )
    const createPoll = (values) => {
        const pollObj = {
            pollName: values.formName,
            optionCount: 2 + (values.option3.length > 0 ? 1 : 0) + (values.option4.length > 0 ? 1 : 0),
            option1: values.option1,
            vote1: 0,
            option2: values.option2,
            vote2: 0,
            option3: (values.option3.length === 0 ? null : values.option3),
            vote3: 0,
            option4: (values.option4.length === 0 ? null : values.option4),
            vote4: 0,
        }
        axios.post("http://localhost:5000/poll/add", pollObj)
            .then((response) => {
                setPollId(response.data.pollId)

            })
            .catch(err => {
                if (err.response) {
                    console.log(err)
                }
            })



    }

    const copyToClickBoard = (event) => {
        event.preventDefault();
        navigator.clipboard.writeText('http://localhost:3000/poll/' + pollId)

    }

    return (
        <div className='container  p-3'>

            <form className="form-horizontal" onSubmit={formik.handleSubmit}>
                <div className="form-group row m-2">
                    <label className="control-label col-sm-2">Title  </label>
                    <div className="col-sm-10 ">
                        <input placeholder='Title' className="form-control" name='formName' type='text' onChange={formik.handleChange} value={formik.values.formName} onBlur={formik.handleBlur} />
                        {formik.touched.formName && formik.errors.formName ? <p className="text-danger">{formik.errors.formName}</p> : null}
                    </div>
                </div>
                <div className="form-group row m-2">
                    <label className="control-label col-sm-2">Choice 1</label>
                    <div className="col-sm-10">
                        <input placeholder='Option 1' className="form-control" name='option1' type='text' onChange={formik.handleChange} value={formik.values.option1} onBlur={formik.handleBlur} />
                        {formik.touched.option1 && formik.errors.option1 ? <p className="text-danger">{formik.errors.option1}</p> : null}
                    </div>
                </div>
                <div className="form-group row m-2">
                    <label className="control-label col-sm-2">Choice 2</label>
                    <div className="col-sm-10">
                        <input placeholder='Option 2' className="form-control" name='option2' type='text' onChange={formik.handleChange} value={formik.values.option2} onBlur={formik.handleBlur} />
                        {formik.touched.option2 && formik.errors.option2 ? <p className="text-danger">{formik.errors.option2}</p> : null}
                    </div></div>
                <div className="form-group row m-2">
                    <label className="control-label col-sm-2">Choice 3</label>
                    <div className="col-sm-10">
                        <input placeholder='Option 3 (Optional)' className="form-control" name='option3' type='text' onChange={formik.handleChange} value={formik.values.option3} onBlur={formik.handleBlur} />
                        {formik.touched.option3 && formik.errors.option3 ? <p className="text-danger">{formik.errors.option3}</p> : null}
                    </div></div>
                <div className="form-group row m-2">
                    <label className="control-label col-sm-2">Choice 4</label>
                    <div className="col-sm-10">
                        <input placeholder='Option 4 (Optional)' className="form-control" name='option4' type='text' onChange={formik.handleChange} value={formik.values.option4} onBlur={formik.handleBlur} />
                        {formik.touched.option4 && formik.errors.option4 ? <p className="text-danger">{formik.errors.option4}</p> : null}
                        <button className="btn btn-primary m-2" type='submit'>Create Poll</button>
                    </div>
                </div>
            </form>
            {pollId && <>
                <h4>Poll Created!! </h4>


                <div class="input-group">
                    <input type="text" class="form-control" value={'http://localhost:3000/poll/' + pollId} id="myInput" readOnly />
                    <div class="input-group-btn">
                        <button class="btn btn-default" type="button" onClick={(event) => copyToClickBoard(event)}>
                            <FaRegCopy />
                        </button>
                    </div>
                </div>
            </>
            }
        </div>
    )

}
