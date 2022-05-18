import { ID } from "../../../shared/domain/id.value-object";
import { Employee } from "../domain/entities/employee.entity";
import { Job } from "../domain/entities/job.entity";
import { EmployeeCreated } from "../domain/events/employee-created.event";
import { Email } from "../domain/value-objects/email.value-object";

test("Create an employee with invalid email, should throw an error", () => {
  expect(() => {
    const employeeId = ID.create();
    const email = Email.create("benben.com") as Email;
    const job = Job.create({
      id: ID.create(),
      name: "Software engineer",
      level: 10,
      employeeIds: [employeeId],
    });
    Employee.create({
      id: employeeId,
      email,
      firstName: "Ben",
      lastName: "B",
      job,
    });
  }).toThrow(Error);
});
test("Create an employee with valid email, should return an employee and add an event", () => {
  const employeeId = ID.create();
  const email = Email.create("ben@ben.com") as Email;
  const job = Job.create({
    id: ID.create(),
    name: "Software engineer",
    level: 10,
    employeeIds: [employeeId],
  });
  const employee = Employee.create({
    id: employeeId,
    email,
    firstName: "Ben",
    lastName: "B",
    job,
  });
  expect(employee.firstName).toBe("Ben");
  expect(employee.lastName).toBe("B");
  expect(employee.email).toBe("ben@ben.com");
  expect(employee.job.name).toBe("Software engineer");
  expect(employee.isSenior).toBeTruthy();
  const events = employee.pullEvents();
  expect(events).toHaveLength(1);
  expect(events[0]).toBeInstanceOf(EmployeeCreated);
});
