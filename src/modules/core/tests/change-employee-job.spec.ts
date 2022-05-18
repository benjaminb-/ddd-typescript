import { Employee } from "../domain/entities/employee.entity";
import { Job } from "../domain/entities/job.entity";
import { EmployeeCreated } from "../domain/events/employee-created.event";
import { EmployeeJobChanged } from "../domain/events/employee-job-changed.event";
import { Email } from "../domain/value-objects/email.value-object";
import { ID } from "../domain/value-objects/id.value-object";

test("Change employee job, should update the job and add an event", () => {
  const employeeId = ID.create();

  const job = Job.create({
    id: ID.create(),
    name: "Software engineer",
    level: 10,
    employeeIds: [employeeId],
  });

  const employee = Employee.create({
    id: ID.create(),
    email: Email.create("ben@ben.com") as Email,
    firstName: "Ben",
    lastName: "B",
    job,
  });

  const newJob = Job.create({
    id: ID.create(),
    name: "Junior",
    level: 2,
    employeeIds: [employeeId],
  }) as Job;

  employee.changeJob(newJob);

  expect(employee.job.name).toBe("Junior");
  expect(employee.isSenior).toBeFalsy();
  const events = employee.pullEvents();
  expect(events).toHaveLength(2);
  expect(events[0]).toBeInstanceOf(EmployeeCreated);
  expect(events[1]).toBeInstanceOf(EmployeeJobChanged);
});
