#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>

int main() {
    char card_name[3];

    puts("Enter the card name: ");
    scanf("%2s", card_name);

    int val = 0;

    do {
        switch (card_name[0]) {
            case 'K':
            case 'k':
            case 'Q':
            case 'q':
            case 'J':
            case 'j':
                val = 10;
                break;
            case 'A':
                val = 11;
                break;
            default:
                val = atoi(card_name);
                break;
        }
    } while ((card_name[0] != 'X') && (card_name[0] != 'x'));

//    if (card_name[0] == 'K') {
//        val = 10;
//    } else if (card_name[0] == 'Q') {
//        val = 10;
//    } else if (card_name[0] == 'J') {
//        val = 10;
//    } else if (card_name[0] == 'A') {
//        val = 11;
//    } else {
//        val = atoi(card_name);
//    }

    printf("The card value is: %i\n", val);

    return 0;
}