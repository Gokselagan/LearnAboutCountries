
import { render, screen } from "@testing-library/react"
import { LogIn } from "."
import { Provider } from "react-redux";
import  store  from "../../../store";

test("userFirstName input should be rendered", () => {
    render(
        <Provider store={store}>
            <LogIn />
        </Provider>
    );
    const userInputEl = screen.getByLabelText(/first name/i);
    expect(userInputEl).toBeInTheDocument();
})

test("userLastName input should be rendered", () => {
    render(
        <Provider store={store}>
            <LogIn />
        </Provider>
    );
    const userInputEl = screen.getByLabelText(/last name/i);
    expect(userInputEl).toBeInTheDocument();
})

test("userEmail input should be rendered", () => {
    render(
        <Provider store={store}>
            <LogIn />
        </Provider>
    );
    const userInputEl = screen.getByPlaceholderText(/email/i);
    expect(userInputEl).toBeInTheDocument();
})

test("userPassword input should be rendered", () => {
    render(
        <Provider store={store}>
            <LogIn />
        </Provider>
    );
    const userInputEl = screen.getByPlaceholderText(/password/i);
    expect(userInputEl).toBeInTheDocument();
})

test("remember control label should be rendered", () => {
    render(
        <Provider store={store}>
            <LogIn />
        </Provider>
    );
    const userInputEl = screen.getByLabelText(/remember me/i);
    expect(userInputEl).toBeInTheDocument();
})

test("button input should be rendered", () => {
    render(
        <Provider store={store}>
            <LogIn />
        </Provider>
    );
    const userInputEl = screen.getByRole(/button/i);
    expect(userInputEl).toBeInTheDocument();
})

test("forget password link input should be rendered", () => {
    render(
        <Provider store={store}>
            <LogIn />
        </Provider>
    );
    const userInputEl = screen.getByRole("link", { name: /forgot password/i });
    expect(userInputEl).toBeInTheDocument();
})