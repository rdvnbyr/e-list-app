import { useDispatch } from 'react-redux';
// import { signup } from './_redux/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMemo } from 'react';
import { signup } from '../views/auth/_redux/authSlice';
import FooterSmall from '../components/Footers/FooterSmall';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(8, 'Must be 8 characters or more').required('Required'),
    fullname: Yup.string().required('Required'),
    terms: Yup.bool().oneOf([true], 'You must accept the terms and conditions'),
});

const initialValues = {
    fullname: '',
    email: '',
    password: '',
    terms: false,
};
export default function SignupPage() {
    const navigate = useNavigate()
    // const inputFocus = useRef();
    const dispatch = useDispatch();

    const onSubmit = values => {
        // console.log(values);
        const user = {
            username: values.email.split('@')[0],
            fullname: values.fullname,
            email: values.email,
            password: values.password,
            role: 'user',
            terms: {
                accepted: values.terms,
                date: new Date(),
                acceptedText: 'I accept the terms and conditions',
            },
        };
        dispatch(signup(user));
        navigate('/login')
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return (
        <>
            {/* <Navbar transparent /> */}
            <main>
                <section className="relative w-full h-full py-40 min-h-screen">
                    <div
                        className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
                        style={{
                            backgroundImage: 'url(' + require('../assets/img/register_bg_2.png').default + ')',
                        }}
                    ></div>
                    <div className="container mx-auto px-4 h-full">
                        <div className="flex content-center items-center justify-center h-full">
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                                    <div className="rounded-t mb-0 px-6 py-6">
                                        <div className="text-center mb-3">
                                            <h6 className="text-blueGray-500 text-sm font-bold">Sign up with</h6>
                                        </div>
                                        <div className="btn-wrapper text-center">
                                            <button
                                                className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center text-xs ease-linear transition-all duration-150"
                                                type="button"
                                            >
                                                <img
                                                    alt="..."
                                                    className="w-5 mr-1"
                                                    src={require('../assets/img/github.svg').default}
                                                />
                                                Github
                                            </button>
                                            <button
                                                className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center text-xs ease-linear transition-all duration-150"
                                                type="button"
                                            >
                                                <img
                                                    alt="..."
                                                    className="w-5 mr-1"
                                                    src={require('../assets/img/google.svg').default}
                                                />
                                                Google
                                            </button>
                                        </div>
                                        <hr className="mt-6 border-b-1 border-blueGray-300" />
                                    </div>
                                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                        <div className="text-blueGray-400 text-center mb-3 font-bold">
                                            <small>Or sign up with credentials</small>
                                        </div>
                                        <form onSubmit={formik.handleSubmit}>
                                            <div className="relative w-full mb-3">
                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                                    Full Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    placeholder="Full Name"
                                                    {...formik.getFieldProps('fullname')}
                                                />
                                                {formik.touched['fullname'] && formik.errors['fullname'] && (
                                                    <div className="text-red-500 text-xs">{formik.errors['fullname']}</div>
                                                )}
                                            </div>

                                            <div className="relative w-full mb-3">
                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    placeholder="Email"
                                                    {...formik.getFieldProps('email')}
                                                />
                                                {formik.touched['email'] && formik.errors['email'] && (
                                                    <div className="text-red-500 text-xs">{formik.errors['email']}</div>
                                                )}
                                            </div>

                                            <div className="relative w-full mb-3">
                                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                                    Password
                                                </label>
                                                <input
                                                    type="password"
                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    placeholder="Password"
                                                    {...formik.getFieldProps('password')}
                                                />
                                                {formik.touched['password'] && formik.errors['password'] && (
                                                    <div className="text-red-500 text-xs">{formik.errors['password']}</div>
                                                )}
                                            </div>

                                            <div>
                                                <label className="inline-flex items-center cursor-pointer">
                                                    <input
                                                        id="customCheckLogin"
                                                        type="checkbox"
                                                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                                                        {...formik.getFieldProps('terms')}
                                                    />
                                                    <span className="ml-2 text-sm font-semibold text-blueGray-600">
                                                        I agree with the{' '}
                                                        <a
                                                            href="#pablo"
                                                            className="text-lightBlue-500"
                                                            onClick={e => e.preventDefault()}
                                                        >
                                                            Privacy Policy
                                                        </a>
                                                    </span>
                                                </label>
                                                {formik.touched['terms'] && formik.errors['terms'] && (
                                                    <div className="text-red-500 text-xs">{formik.errors['terms']}</div>
                                                )}
                                            </div>

                                            <div className="text-center mt-6">
                                                <button
                                                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                                    type="submit"
                                                >
                                                    Create Account
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="flex flex-wrap mt-6 relative">
                                    <div className="w-1/2">
                                        <a href="#pablo" onClick={e => e.preventDefault()} className="text-blueGray-200">
                                            <small>Forgot password?</small>
                                        </a>
                                    </div>
                                    <div className="w-1/2 text-right">
                                        <Link to="/login" className="text-blueGray-200">
                                            <small>You have already account? Sign In</small>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <FooterSmall absolute />
                </section>
            </main>
        </>
    );
}
