describe('api testing', () => {
	it('successfully retrieves all employees and counts the number of employees with age number higher than 30', () => {
		cy.request('https://dummy.restapiexample.com/api/v1/employees').as('employees');
		cy.get('@employees').then(({ body }) => {
			const { data } = body;

			const employeesWithAgeOverThan30 = data.filter(employee => employee.employee_age > 30);
			console.log(`Number of employees over 30 are : ${employeesWithAgeOverThan30.length}`);
		});
	});

	it('successfully adds new employee with age higher than 30 and assert that operation is successful', () => {
		cy.fixture('employees.json').then(employeesData => {
			const { NEW_EMPLOYEE_DATA } = employeesData;
			const { name, salary, age } = NEW_EMPLOYEE_DATA;

			cy.request('POST', 'https://dummy.restapiexample.com/api/v1/create', {
				name,
				salary,
				age,
			}).then(resp => {
				expect(resp.body).to.have.property('status', 'success');
				expect(resp.body).to.have.property('data');
				const { data } = resp.body;
				expect(data).to.have.property('name', name);
				expect(data).to.have.property('salary', salary);
				expect(data).to.have.property('age', age);
				expect(data).to.have.property('id');
			});
		});
	});

	it('successfully updates the employee and asserts that operation is successful', () => {
		cy.fixture('employees.json').then(employeesData => {
			const { UPDATE_EMPLOYEE_DATA } = employeesData;
			const { ID, name, age, salary } = UPDATE_EMPLOYEE_DATA;

			cy.request('PUT', `https://dummy.restapiexample.com/api/v1/update/${ID}`, {
				name,
				salary,
				age,
			}).then(resp => {
				expect(resp.body).to.have.property('status', 'success');
				expect(resp.body).to.have.property('data');
				const { data } = resp.body;
				expect(data).to.have.property('name', name);
				expect(data).to.have.property('salary', salary);
				expect(data).to.have.property('age', age);
			});
		});
	});

	it('successfully deletes the employee that he added and asserts the operation is successful', () => {
		cy.fixture('employees.json').then(employeesData => {
			const { UPDATE_EMPLOYEE_DATA } = employeesData;
			const { ID, name, age, salary } = UPDATE_EMPLOYEE_DATA;

			cy.request('DELETE', `https://dummy.restapiexample.com/api/v1/delete/${ID}`, {
				name,
				salary,
				age,
			}).then(resp => {
				expect(resp.body).to.have.property('status', 'success');
			});
		});
	});
});
