# Type sharing

this is a tinkering project trying to get a full stack typescript application running and share typings between both the backend and frontend

## Motivation and goals

There is an existing pattern (probably not by any means a *common* pattern, but a pattern that exists nevertheless), consisting of taking code that implements a rest api and generating code that calls the rest api in a javasript application.
 
(for instance https://github.com/2718e/TypeAwesome-WebApi)

This can be useful as you can treat server calls as normal async functions (aka things that return promises). If the client side uses typescript, this
can in some cases also allow the api calls to be type safe if type information is exported from the server when doing the generation.

However - using code generation can complicate build pipelines and be confusing.

What this "tinkering" project exists to explore is if it is possible to get the same type safety that generating api calling code brings - but to do so *without* using code generation - when both the client and server are implemented in typescript.

This is still in development and hasn't been used in any real projects yet - as such it is unknown if it actually works correctly

### Todos

- could server caller be a higher order function rather than a class? 

### Credits

followed this article a bit https://medium.com/aherforth/how-to-get-auto-restart-and-breakpoint-support-with-typescript-and-node-5af589dd8687