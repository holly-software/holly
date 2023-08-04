import datetime
import strawberry

@strawberry.type
class Roles:
    admin: bool
    student: bool
    teacher: bool


@strawberry.type
class User:
    id: str
    
    name: str
    roles: Roles

    @strawberry.field
    async def pass_actions(self) -> list["PassAction"]:
        raise NotImplementedError()

    @strawberry.field
    async def incoming_pass_requests(self) -> list["PassRequest"]:
        raise NotImplementedError()

@strawberry.type
class Pass:
    id: str

    @strawberry.field
    async def actions(self) -> list["PassAction"]:
        raise NotImplementedError()

@strawberry.interface
class PassAction:
    object: Pass
    time: datetime.datetime
    actor: User

@strawberry.type
class PassRequest(PassAction):
    requestee: User
    reason: str

@strawberry.type
class PassIssuance(PassAction):
    ...

@strawberry.type
class PassRevocation(PassAction):
    ...

@strawberry.type
class Query:
    @strawberry.field
    async def me(self) -> User:
        raise NotImplementedError()

schema = strawberry.Schema(query=Query)