from django.shortcuts import render, get_object_or_404, redirect
from .models import Employee, Department
from .forms import EmployeeForm, DepartmentForm

# List of employees
def employee_list(request):
    employees = Employee.objects.all()
    return render(request, 'management/employee_list.html', {'employees': employees})

# Create a new employee
def employee_create(request):
    if request.method == 'POST':
        form = EmployeeForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('employee_list')
    else:
        form = EmployeeForm()
    return render(request, 'management/employee_form.html', {'form': form})

# Edit employee
def employee_edit(request, id):
    employee = get_object_or_404(Employee, id=id)
    if request.method == 'POST':
        form = EmployeeForm(request.POST, instance=employee)
        if form.is_valid():
            form.save()
            return redirect('employee_list')
    else:
        form = EmployeeForm(instance=employee)
    return render(request, 'management/employee_form.html', {'form': form})

# Delete employee
def employee_delete(request, id):
    employee = get_object_or_404(Employee, id=id)
    if request.method == 'POST':
        employee.delete()
        return redirect('employee_list')
    return render(request, 'management/employee_confirm_delete.html', {'employee': employee})
