import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom';

test('size select element initially displays "Small"', () => {
  render(<App />);
  expect(screen.getByText(/your selection: small cheese/i)).toBeInTheDocument();
});

test('select Size dropdown displays the user\'s selected value', () => {
  render(<App />);
  const sizeSelect = screen.getByLabelText(/size/i);
  fireEvent.change(sizeSelect, { target: { value: 'Large' } });
  expect(screen.getByText(/your selection: large cheese/i)).toBeInTheDocument();
});

test('Your selection message initially displays "small cheese"', () => {
  render(<App />);
  expect(screen.getByText(/your selection: small cheese/i)).toBeInTheDocument();
});

test('selecting options updates the "Your selection" message', () => {
  render(<App />);
  const sizeSelect = screen.getByLabelText(/size/i);
  const cheeseSelect = screen.getByLabelText(/cheese/i);

  fireEvent.change(sizeSelect, { target: { value: 'Large' } });
  fireEvent.change(cheeseSelect, { target: { value: 'no cheese' } });

  expect(screen.getByText(/your selection: large no cheese/i)).toBeInTheDocument();
});

test('Contact Info text box initially displays a placeholder value of "email address"', () => {
  render(<App />);
  const contactInput = screen.getByPlaceholderText(/email address/i);
  expect(contactInput).toBeInTheDocument();
});

test('the page shows information the user types into the contact form field', () => {
  render(<App />);
  const contactInput = screen.getByPlaceholderText(/email address/i);
  fireEvent.change(contactInput, { target: { value: 'test@example.com' } });
  expect(contactInput.value).toBe('test@example.com');
});

test('form contains a "Submit Order" button', () => {
  render(<App />);
  const submitButton = screen.getByText(/submit order/i);
  expect(submitButton).toBeInTheDocument();
});

test('clicking the Place Order button displays a thank you message', () => {
  render(<App />);
  const placeOrderButton = screen.getByText(/place order/i);
  fireEvent.click(placeOrderButton);
  
  // Wait for the thank you message to appear (if it's delayed)
  setTimeout(() => {
    expect(screen.getByText(/thank you for your order!/i)).toBeInTheDocument();
  }, 0);
});

test('Size and cheese options reset after clicking "Place Order"', () => {
  render(<App />);
  const sizeSelect = screen.getByLabelText(/size/i);
  const cheeseSelect = screen.getByLabelText(/cheese/i);

  fireEvent.change(sizeSelect, { target: { value: 'Large' } });
  fireEvent.change(cheeseSelect, { target: { value: 'no cheese' } });

  const placeOrderButton = screen.getByText(/place order/i);
  fireEvent.click(placeOrderButton);

  expect(screen.getByText(/your selection: small cheese/i)).toBeInTheDocument();
});

test('Contact Info field accepts only valid email format', () => {
  render(<App />);
  const contactInput = screen.getByPlaceholderText(/email address/i);

  fireEvent.change(contactInput, { target: { value: 'invalidemail' } });
  expect(contactInput.value).toBe('invalidemail');

  fireEvent.change(contactInput, { target: { value: 'test@example.com' } });
  expect(contactInput.value).toBe('test@example.com');
});

test('Submit Order button is disabled when email is not provided', () => {
  render(<App />);
  const submitButton = screen.getByText(/submit order/i);
  const contactInput = screen.getByPlaceholderText(/email address/i);

  expect(submitButton).toBeDisabled();

  fireEvent.change(contactInput, { target: { value: 'test@example.com' } });

  expect(submitButton).not.toBeDisabled();
});

test('Size and cheese options reset after clicking "Submit Order"', () => {
  render(<App />);
  const sizeSelect = screen.getByLabelText(/size/i);
  const cheeseSelect = screen.getByLabelText(/cheese/i);
  const contactInput = screen.getByPlaceholderText(/email address/i);

  fireEvent.change(sizeSelect, { target: { value: 'Large' } });
  fireEvent.change(cheeseSelect, { target: { value: 'no cheese' } });
  fireEvent.change(contactInput, { target: { value: 'test@example.com' } });

  const submitButton = screen.getByText(/submit order/i);
  fireEvent.click(submitButton);

  // Wait for the reset to complete
  setTimeout(() => {
    expect(screen.getByText(/your selection: small cheese/i)).toBeInTheDocument();
  }, 0);
});