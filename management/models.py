from django.db import models

class Department(models.Model):
    # Represents a department in the organization
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Employee(models.Model):
    # Represents an employee in the organization
    name = models.CharField(max_length=100)
    # ForeignKey establishes a many-to-one relationship with Department
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    position = models.CharField(max_length=100)

    def __str__(self):
        return self.name