# Database Queries

## Find all customers with postal code 1010

SELECT * 
FROM   customers 
WHERE  PostalCode = 1010; 

## Find the phone number for the supplier with the id 11

SELECT Phone 
FROM   suppliers
WHERE  SupplierID = 11;

## List first 10 orders ever places, descending by the order date

SELECT * 
FROM   orders 
ORDER  BY OrderDate ASC 
LIMIT  10; 

## Find all customers that live in London, Madrid, or Brazil

SELECT * 
FROM   customers 
WHERE  city IN ( 'London', 'Madrid' ) 
        OR country = 'Brazil' 
ORDER  BY country; 

## Add a customer record for "The Shire", the contact name is "Bilbo Baggins" the address is -"1 Hobbit-Hole" in "Bag End", postal code "111" and the country is "Middle Earth"

INSERT INTO customers 
            (CustomerName, 
             ContactName, 
             Address, 
             City, 
             PostalCode, 
             Country) 
VALUES      ('The Shire', 
             'Bilbo Baggins', 
             '1 Hobbit-Hole', 
             'Bag End', 
             '111', 
             'Middle Earth');

## Update Bilbo Baggins record so that the postal code changes to "11122"

UPDATE customers 
SET    PostalCode = '11122' 
WHERE  ContactName = 'Bilbo Baggins'; 

## (Stretch) Find a query to discover how many different cities are stored in the Customers table. Repeats should not be double counted

SELECT Count(DISTINCT city) 
FROM   customers;

## (Stretch) Find all suppliers who have names longer than 20 characters. You can use `length(SupplierName)` to get the length of the name

SELECT *, 
       Length(CustomerName) 
FROM   customers 
WHERE  Length(CustomerName) >= 20 