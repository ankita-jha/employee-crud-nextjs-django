from rest_framework import serializers
from .models import Employee, Department

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id', 'name']

class EmployeeSerializer(serializers.ModelSerializer):
    # Nested serializer for department details
    department = DepartmentSerializer(read_only=True)
    # Additional field for handling department assignment
    department_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Employee
        fields = ['id', 'name', 'position', 'department', 'department_id']

    def create(self, validated_data):
        # Custom create method to handle department assignment
        department_id = validated_data.pop('department_id')
        department = Department.objects.get(id=department_id)
        employee = Employee.objects.create(department=department, **validated_data)
        return employee

    def update(self, instance, validated_data):
        # Custom update method to handle department reassignment
        department_id = validated_data.pop('department_id', None)
        if department_id:
            department = Department.objects.get(id=department_id)
            instance.department = department
        return super().update(instance, validated_data)