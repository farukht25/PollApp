import React from 'react'
import * as Yup from 'yup'
import { Formik, useFormik } from 'formik'
import axios from "axios";

export default function CreatePollForm() {

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
            option3: values.option3,
            vote3: 0,
            option4: values.option4,
            vote4: 0,
        }
        alert(JSON.stringify(pollObj))
        axios.post("http://localhost:5000/poll/add", pollObj)
            .then((response) => {
                console.log(response);

            })
            .catch(err=>{
                if(err.response){
                    console.log(err)
                }
            })



    }
    return (
        <div className='container border border-primary'>
            <label>Question</label>
            <form onSubmit={formik.handleSubmit}>
                <input name='formName' type='text' onChange={formik.handleChange} value={formik.values.formName} onBlur={formik.handleBlur} />
                {formik.touched.formName && formik.errors.formName ? <p className="text-danger">{formik.errors.formName}</p> : null}

                <label>Choice 1</label>
                <input name='option1' type='text' onChange={formik.handleChange} value={formik.values.option1} onBlur={formik.handleBlur} />
                {formik.touched.option1 && formik.errors.option1 ? <p className="text-danger">{formik.errors.option1}</p> : null}

                <label>Choice 2</label>
                <input name='option2' type='text' onChange={formik.handleChange} value={formik.values.option2} onBlur={formik.handleBlur} />
                {formik.touched.option2 && formik.errors.option2 ? <p className="text-danger">{formik.errors.option2}</p> : null}
                <label>Choice 3</label>
                <input name='option3' type='text' onChange={formik.handleChange} value={formik.values.option3} onBlur={formik.handleBlur} />
                {formik.touched.option3 && formik.errors.option3 ? <p className="text-danger">{formik.errors.option3}</p> : null}

                <label>Choice 4</label>
                <input name='option4' type='text' onChange={formik.handleChange} value={formik.values.option4} onBlur={formik.handleBlur} />
                {formik.touched.option4 && formik.errors.option4 ? <p className="text-danger">{formik.errors.option4}</p> : null}
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}
