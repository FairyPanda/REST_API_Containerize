from .models import UserDetails


class ModelUitil:
    def getuserDetailsfromId(self, List):
        participants = []
        for userid in List:
            UserObj = UserDetails.objects.get(pk=userid)
            participants.append(UserObj.email)

        return participants
