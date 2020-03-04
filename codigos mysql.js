/*

LOCK TABLES `employee` WRITE;
INSERT INTO `employee` VALUE (1, 'Edgar Siqueira', 'EMP90', 265400),(2, 'Jefferson Patrício', 'EMP94',364600),(3, 'André Felipe', 'EMP06', 316400),(4, 'Luiz Eduardo', 'EMP956', 417500);
UNLOCK TABLES;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Edg@r2018'

CREATE DEFINER=`root`@`localhost` PROCEDURE `EmployeeAddOrEdit`(
IN _EmpID INT,
IN _Name varchar(45),
IN _EmpCode varchar(45),
IN _Salary int
)
BEGIN
	IF _EmpID = 0 THEN
		insert INTO employee(Name,EmpCode, Salary)
		VALUES (_Name,_EmpCode,_Salary);
		
		SET _EmpID = last_insert_id();
	ELSE
		UPDATE Employee
        SET
        Name = _Name,
        EmpCode = _EmpCode,
        Salary = _Salary
        WHERE EmpID = _EmpID;
	 END IF;
     
     SELECT _EmpID AS 'EmpID';
        
END

*/