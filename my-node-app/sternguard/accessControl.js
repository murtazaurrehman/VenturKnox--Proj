function hasAccess(role, path, method) {
  // Define permissions for each role
  const rolePermissions = {
    admintoken: {
      paths: ['/validate-token/servicer/', '/validate-token/httpbin/', '/validate-token/sternguard/'],
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // All methods allowed
    },
    manager: {
      paths: ['/validate-token/servicer/'],
      methods: ['GET', 'POST'], // Read and Create allowed
    },
    waiter: {
      paths: ['/validate-token/httpbin/'],
      methods: ['GET'], // Only read access allowed
    },
  };

  // Get the allowed paths and methods for the role
  const allowedPaths = rolePermissions[role]?.paths || [];
  const allowedMethods = rolePermissions[role]?.methods || [];

  console.log(`Role: ${role}`);
  console.log(`Path: ${path}`);
  console.log(`Method: ${method}`);
  console.log(`Allowed Paths: ${allowedPaths}`);
  console.log(`Allowed Methods: ${allowedMethods}`);

  // Check if the requested path matches one of the allowed paths
  const isPathAllowed = allowedPaths.some((allowedPath) => path.startsWith(allowedPath));

  // Check if the HTTP method is allowed
  const isMethodAllowed = allowedMethods.includes(method.toUpperCase());

  console.log(`Is Path Allowed: ${isPathAllowed}`);
  console.log(`Is Method Allowed: ${isMethodAllowed}`);

  // Return true only if both the path and method are allowed
  return isPathAllowed && isMethodAllowed;
}

module.exports = hasAccess;
