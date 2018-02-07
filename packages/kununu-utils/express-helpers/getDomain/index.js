export default req => req.get('x-forwarded-host') || req.get('host');
