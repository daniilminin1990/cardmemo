import { useState } from "react";
import { useParams } from "react-router-dom";
import { HeadingOfPage } from "@/Pages/CardsPage/HeadingSecondRow/HeadingOfPage";
import { ModalAddEditDeck } from "@/components/Modals/ModalAddEditDeck/ModalAddEditDeck";
import { ModalAddEditCard } from "@/components/Modals/ModalEditCard/ModalAddEditCard";
import ModalOnEmpty from "@/components/Modals/ModalOnEmpty/ModalOnEmpty";
import Loading from "@/components/ui/Loading/Loading";
import { LoadingBar } from "@/components/ui/LoadingBar/LoadingBar";
import { Page } from "@/components/ui/Page/Page";
import { useCards } from "@/features/cards/lib/hooks/useCards";
import { DeleteCard } from "@/features/cards/ui/Cards/components/modals/DeleteCard/DeleteCard";
import { DeleteDeck } from "@/features/cards/ui/Cards/components/modals/DeleteDeck/DeleteDeck";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useGetCardsQuery } from "@/services/cards/cards.service";
import { CardResponse } from "@/services/cards/cards.types";
import { useGetDeckByIdQuery } from "@/services/decks/decks.service";

import s from "./Cards.module.scss";
import { Table } from "@/features/cards/ui/Cards/components";
import { ModalProvider } from "@/features/cards/ui/Cards/components/ModalProvider/ModalProvider";
import { ModalKey, useModal } from "@/features/cards/lib/hooks/useModal";

export const Cards = () => {
  const { currentOrderBy, currentPage, debouncedSearchValue, itemsPerPage, search } =
    useQueryParams();

  const { deckId = "" } = useParams();

  const {
    currentData: currentDeckData,
    data: deckData,
    isFetching: isDeckFetching,
    isLoading: isDeckLoading
  } = useGetDeckByIdQuery({ id: deckId });

  const { currentData, data, isFetching, isLoading } = useGetCardsQuery(
    {
      args: { currentPage, itemsPerPage, orderBy: currentOrderBy, question: debouncedSearchValue },
      id: deckId ?? ""
    },
    { skip: !currentDeckData }
  );

  const [cardItem, setCardItem] = useState<CardResponse>();
  const [isEmptyModal, setIsEmptyModal] = useState(false); // Переход назад с пустой таблицей
  const [isUpdateDeckModal, setIsUpdateDeckModal] = useState(false); // Изменение Deck
  const [isDeleteDeckModal, setIsDeleteDeckModal] = useState(false); // Удаление Deck
  const [isCreateCardModal, setIsCreateCardModal] = useState(false); // Добавление Card | Переход в Learn?
  const [isUpdateCardModal, setIsUpdateCardModal] = useState(false); // Изменение Card | Переход в Learn
  // const [isDeleteCardModal, setIsDeleteCardModal] = useState(false); // Удаление Card

  const { conditionMessage, isCardsCountZero, isMineCards, loadingStatus } = useCards({
    currentData,
    currentDeckData,
    isDeckLoading,
    isFetching
  });

  const cardsData = currentData ?? data;

  if (isLoading || isDeckLoading || isDeckFetching) {
    return <Loading type={"pageLoader"} />;
  }

  return (
    <>
      {loadingStatus && <LoadingBar />}
      <Page className={s.common} mt={"24px"}>
        <ModalProvider>
          <ModalOnEmpty open={isEmptyModal} setIsOpenModal={setIsEmptyModal} />
          <ModalAddEditDeck
            item={currentDeckData}
            open={isUpdateDeckModal}
            setOpen={setIsUpdateDeckModal}
          />
          <ModalAddEditCard item={cardItem} open={isUpdateCardModal} setOpen={setIsUpdateCardModal} />
          <ModalAddEditCard open={isCreateCardModal} setOpen={setIsCreateCardModal} />
          <DeleteDeck
            deckData={deckData}
            deckId={deckId}
            isDeleteDeckModal={isDeleteDeckModal}
            setIsDeleteDeckModal={setIsDeleteDeckModal}
          />
          <DeleteCard
            cardItem={cardItem}
          />
          <HeadingOfPage
            deckId={deckId}
            isCardsCountZero={isCardsCountZero}
            isMineCards={isMineCards}
            openCreateCardModalHandler={setIsCreateCardModal}
            openDeleteDeckModalHandler={setIsDeleteDeckModal}
            openEditDeckModalHandler={setIsUpdateDeckModal}
            openEmptyDeckModalHandler={setIsEmptyModal}
          />
          <Table
            cardsData={cardsData}
            conditionMessage={conditionMessage}
            currentData={currentData}
            deckData={deckData}
            isCardsCountZero={isCardsCountZero}
            isFetching={isFetching}
            isLoading={isLoading}
            isMineCards={isMineCards}
            loadingStatus={loadingStatus}
            search={search}
            setCardItem={setCardItem}
            setIsCreateCardModal={setIsCreateCardModal}
            setIsUpdateCardModal={setIsUpdateCardModal}
          />
        </ModalProvider>
      </Page>
    </>
  );
};
