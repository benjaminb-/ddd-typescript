import { ID } from "../../../shared/domain/id.value-object";
import { Employee } from "../domain/entities/employee.entity";
import { EmployeeCreated } from "../domain/events/employee-created.event";
import { Email } from "../domain/value-objects/email.value-object";

test("Create an employee with invalid email, should throw an error", () => {
  expect(() => {
    const employeeId = ID.create();
    const email = Email.create("benben.com");
    Employee.create({
      id: employeeId,
      email,
      firstName: "Ben",
      lastName: "B",
    });
  }).toThrow(Error);
});
test("Create an employee with valid email, should return an employee and add an event", () => {
  const employeeId = ID.create();
  const email = Email.create("ben@ben.com");
  const employee = Employee.create({
    id: employeeId,
    email,
    firstName: "Ben",
    lastName: "B",
  });
  expect(employee.firstName).toBe("Ben");
  expect(employee.lastName).toBe("B");
  expect(employee.email).toBe("ben@ben.com");
  const events = employee.pullEvents();
  expect(events).toHaveLength(1);
  expect(events[0]).toBeInstanceOf(EmployeeCreated);
});
